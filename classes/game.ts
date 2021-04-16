import socketIO from 'socket.io';

export const startGame = async (sala: string, io: socketIO.Server) => {
    console.log('Emitiendo');
    let startClock = 10;
    while (startClock !== -1) {
        io.to(sala).emit('clock', {
            clock: startClock,
            state: 1,
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        startClock--;
    }
    // Lanzar a la pantalla de preguntas
    io.to(sala).emit('preguntas-room');
}