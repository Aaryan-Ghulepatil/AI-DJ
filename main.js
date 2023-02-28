song="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreleftWrist=0;
scorerightWrist=0;

function preload(){
   song=loadSound("music.mp3");
}

function setup(){

canvas= createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialised");

}

function gotPoses(results){
  if(results.length>0){
    console.log(results);

    leftWristx=results[0].pose.leftWrist.x;
    leftWristy=results[0].pose.leftWrist.y;
    console.log("Left Wrist X: "+leftWristx+", Left Wrist Y :"+leftWristy);
    rightWristx=results[0].pose.rightWrist.x;
    rightWristy=results[0].pose.rightWrist.y;
    console.log("Right Wrist X: "+rightWristx+", Right Wrist Y: "+rightWristy);

    scoreleftWrist=results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score = "+scoreleftWrist);
    scorerightWrist=results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score = "+scorerightWrist);
  }
}

function draw(){
    image(video,0,0,600,500);

    fill("red");
    stroke("red");
    if(scoreleftWrist>0.2){
      circle(leftWristx,leftWristy,20);
      main_number=Number(leftWristy);
      remove_decimal=floor(main_number);
      volume=remove_decimal/500;    
      document.getElementById("volume").innerHTML="Volume- "+volume;
      song.setVolume(volume);
    }
    if(scorerightWrist>0.2){
      circle(rightWristx,rightWristy,20);
      if(rightWristy>0 && rightWristy<=100){
        document.getElementById("speed").innerHTML="Speed= 0.5x";
        song.rate(0.5);
      }
      else if(rightWristy>100 && rightWristy<=200){
        document.getElementById("speed").innerHTML="Speed= 1x";
        song.rate(1);
      }
      else if(rightWristy>200 && rightWristy<=300){
        document.getElementById("speed").innerHTML="Speed= 1.5x";
        song.rate(1.5);
      }
      else if(rightWristy>300 && rightWristy<=400){
        document.getElementById("speed").innerHTML="Speed= 2x";
        song.rate(2);
      }
      else if(rightWristy>400 && rightWristy<=500){
        document.getElementById("speed").innerHTML="Speed= 2.5x";
        song.rate(2.5);
      }
    }

}

function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}
