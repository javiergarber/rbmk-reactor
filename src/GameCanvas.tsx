import { useEffect, useRef } from 'react';
import Game from './game/Game';
import { useWindowDimensions } from './hooks/useWindowDimensions';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let gameManager: Game;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext('2d');

    if (canvas && canvasContext) {
      gameManager = new Game(canvas, canvasContext);
    }

    // Opcional: cleanup para evitar fugas de memoria o problemas con múltiples instancias
    return () => {
      // Aquí puedes agregar lógica para limpiar el gameManager si es necesario
    };
  }, []);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default GameCanvas;
