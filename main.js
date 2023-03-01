resultadoGlobal = [];
img = "";
modelo = "";
document.getElementById("tStatus").style.display = 'none';
document.getElementById("detectados").style.display = 'none';

function preload(){
    som = loadSound("alarm_r.mp3");
}
function setup(){
    cnv = createCanvas(600, 400);
    cnv.center();

    video = createCapture(VIDEO);
    video.hide();
}
function modeloCarregado(){
    console.log("Modelo Carregado");
    modelo = true;
}
function pegarResultado(erro, resultado){
    if(erro){
        console.log(erro);
    }
    else{
        console.log(resultado);
        resultadoGlobal = resultado;
    }
}
function draw(){
    image(video, 0, 0, 600, 400);
    if(modelo != ""){
        objetoDetectado.detect(video, pegarResultado);
        for(var i = 0; i < resultadoGlobal.length; i++){
            fill("#000000");
            textSize(25);
            porcentagem = floor(resultadoGlobal[i].confidence * 100)
            text(resultadoGlobal[i].label + " " + porcentagem + "%", resultadoGlobal[i].x, resultadoGlobal[i].y+20);
            stroke("#000000");
            noFill()
            rect(resultadoGlobal[i].x, resultadoGlobal[i].y, resultadoGlobal[i].width, resultadoGlobal[i].height);
            document.getElementById("obj").innerHTML = resultadoGlobal.length;
            if(resultadoGlobal[i].label == "person"){
                document.getElementById("status").innerHTML = "Bebe Detectado";
                som.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Bebe Não Detectado";
                som.play();
            }
        }
    }
    if(resultadoGlobal.length <= 0 ){
        document.getElementById("status").innerHTML = "Bebe Não Detectado";
        som.play();
    }
}
function iniciar(){
    objetoDetectado = ml5.objectDetector('cocossd', modeloCarregado);
    document.getElementById("status").innerHTML = "Objeto detectado";
    document.getElementById("tStatus").style.display = 'block';
    document.getElementById("detectados").style.display = 'block';
    document.getElementById("iniciar").style.display = 'none';
}