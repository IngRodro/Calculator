import React, { useEffect, useRef } from 'react';
import styles from "../css/Canvas.module.css";
import * as tf from "@tensorflow/tfjs";
import CanvasDraw from "react-canvas-draw";



const Canvas = ({ setNumber, setNumber2, operation }) => {
  const brushWidth = 5;
  const color = "#000000";
  const canvasRef = useRef(null);
  const smallCanvasRef = useRef(null);
  const modeloRef = useRef(null);

  const loadModel = async () => {
    console.log("Cargando modelo...");
    modeloRef.current = await tf.loadLayersModel("model.json");
    console.log("Modelo cargado...");
  };

  const resample_single = (canvas, width, height, resize_canvas) => {
    var width_source = canvas.current.canvas.drawing.width;
    var height_source = canvas.current.canvas.drawing.height;
    width = Math.round(width);
    height = Math.round(height);

    var ratio_w = width_source / width;
    var ratio_h = height_source / height;
    var ratio_w_half = Math.ceil(ratio_w / 2);
    var ratio_h_half = Math.ceil(ratio_h / 2);

    var ctx = canvas.current.canvas.drawing.getContext("2d");
    var ctx2 = resize_canvas.current.getContext("2d");
    var img = ctx.getImageData(0, 0, width_source, height_source);
    var img2 = ctx2.createImageData(width, height);
    var data = img.data;
    var data2 = img2.data;

    for (var j = 0; j < height; j++) {
      for (var i = 0; i < width; i++) {
        var x2 = (i + j * width) * 4;
        var weight = 0;
        var weights = 0;
        var weights_alpha = 0;
        var gx_r = 0;
        var gx_g = 0;
        var gx_b = 0;
        var gx_a = 0;
        var center_y = (j + 0.5) * ratio_h;
        var yy_start = Math.floor(j * ratio_h);
        var yy_stop = Math.ceil((j + 1) * ratio_h);
        for (var yy = yy_start; yy < yy_stop; yy++) {
          var dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
          var center_x = (i + 0.5) * ratio_w;
          var w0 = dy * dy; //pre-calc part of w
          var xx_start = Math.floor(i * ratio_w);
          var xx_stop = Math.ceil((i + 1) * ratio_w);
          for (var xx = xx_start; xx < xx_stop; xx++) {
            var dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
            var w = Math.sqrt(w0 + dx * dx);
            if (w >= 1) {
              //pixel too far
              continue;
            }
            //hermite filter
            weight = 2 * w * w * w - 3 * w * w + 1;
            var pos_x = 4 * (xx + yy * width_source);
            //alpha
            gx_a += weight * data[pos_x + 3];
            weights_alpha += weight;
            //colors
            if (data[pos_x + 3] < 255)
              weight = weight * data[pos_x + 3] / 250;
            gx_r += weight * data[pos_x];
            gx_g += weight * data[pos_x + 1];
            gx_b += weight * data[pos_x + 2];
            weights += weight;
          }
        }
        data2[x2] = gx_r / weights;
        data2[x2 + 1] = gx_g / weights;
        data2[x2 + 2] = gx_b / weights;
        data2[x2 + 3] = gx_a / weights_alpha;
      }
    }

    //Ya que esta, exagerarlo. Blancos blancos y negros negros..?

    for (var p = 0; p < data2.length; p += 4) {
      var gris = data2[p]; //Esta en blanco y negro

      if (gris < 100) {
        gris = 0; //exagerarlo
      } else {
        gris = 255; //al infinito
      }

      data2[p] = gris;
      data2[p + 1] = gris;
      data2[p + 2] = gris;
    }


    ctx2.putImageData(img2, 0, 0);
  };

  const predict = async () => {
    var ctx2 = smallCanvasRef.current.getContext("2d");
    resample_single(canvasRef, 28, 28, smallCanvasRef)

    var imgData = ctx2.getImageData(0, 0, 28, 28);
    var arr = []; //El arreglo completo
    var arr28 = []; //Al llegar a 28 posiciones se pone en 'arr' como un nuevo indice
    for (var p = 0; p < imgData.data.length; p += 4) {
      var valor = imgData.data[p + 3] / 255;
      arr28.push([valor]); //Agregar al arr28 y normalizar a 0-1. Aparte queda dentro de un arreglo en el indice 0... again
      if (arr28.length === 28) {
        arr.push(arr28);
        arr28 = [];
      }
    }

    arr = [arr]; //Meter el arreglo en otro arreglo por que si no tio tensorflow se enoja >:(
    //Nah basicamente Debe estar en un arreglo nuevo en el indice 0, por ser un tensor4d en forma 1, 28, 28, 1
    var tensor4 = tf.tensor4d(arr);
    var resultados = modeloRef.current.predict(tensor4).dataSync();
    var mayorIndice = resultados.indexOf(Math.max.apply(null, resultados));
    if(operation === "") {
      setNumber(prev => prev.toString() + mayorIndice.toString());
    }
    else {
      setNumber2(prev => prev.toString() + mayorIndice.toString());
    }
    limpiar();
  };

  useEffect(() => {
    loadModel()
  }, []);

  const limpiar = () => {
    canvasRef.current.clear();
  };

  return (
    <div className={styles["canvas-container"]}>
      <CanvasDraw ref={canvasRef} brushRadius={brushWidth} brushColor={color} canvasWidth={400} canvasHeight={400} lazyRadius={0} hideGrid={true} />
      <canvas ref={smallCanvasRef} id="smallcanvas" className={styles.smallcanvas}></canvas>
      <div className={styles["canvas-buttons"]}>
        <button className={styles["canvas-button"]} onClick={predict}>Agregar</button>
        <button className={styles["canvas-button"]} onClick={limpiar}>Clear</button>
      </div>
    </div>
  );
};

export default Canvas;
