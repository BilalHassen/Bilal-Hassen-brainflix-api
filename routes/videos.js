const express = require("express");
const router = express.Router();

const fs = require("fs");
const newVideoId = require("uniqid");

router.use(express.json());

// function to read video data from the json file
function readVideoData() {
  const videoDataFile = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataFile);
  videos = videoData[0];
  return videos;
}

function readAllVideoData() {
  const videoDataFile = fs.readFileSync("./data/videos.json");
  const videoData = JSON.parse(videoDataFile);
  return videoData;
}

// function to be used when the post request is made to add a video
function postVideoData(data) {
  const transformedData = JSON.stringify(data);
  fs.writeFileSync("./data/videos.json", transformedData);
}

// route for getting the full information with a matching id

router.get("/:id", (req, res) => {
  let singleVideoData = readVideoData();
  const id = req.params.id;
  console.log("this is the ", id);
  const singleVideoDataFind = singleVideoData.find((video) => {
    return video.id === id;
  });
  console.log("video data:", singleVideoDataFind);
  res.send(singleVideoDataFind);
});

router.get("/", (req, res) => {
  const videoData = readVideoData();
  //   videoData.pop();
  const videosData = videoData.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  console.log({ videosData });
  res.json(videosData);
});

router.post("/", (req, res) => {
  let videoData = readAllVideoData();
  console.log({ data: req.body });
  const newVideo = {
    id: newVideoId(),
    title: req.body.titleInput,
    description: req.body.descriptionInput,
    image: "https://i.imgur.com/nhX3VEW.jpeg",
    views: "100M",
    channel: "Bilal Hassen",
    likes: "1.6M",
    timestamp: 1698632099000,
    comments: [
      {
        id: "c93c16f0-4795-45d1-b0da-21696d54f25a",
        name: "Erling Haaland",
        comment:
          "probably the best video on this website, shout out to Bilal props, for the sick video,. The production quality is insane and I was pretty suprised to find out the guy is elden ring lord as well. All around cool dude if you ask me.  ",
        likes: "10k",
        timestamp: 1675995359000,
      },
      {
        id: "99938bd4-67f9-4404-ad3e-b23a6ad05717",
        name: "Joe Rogan",
        comment:
          "this guys a class act. Props to him. I didn't expect him to have gotten his bjj black belt from such an amazing coach, I have to say the guy can legitametaly roll!! crazy grappling skills and submission defence. Great Work Kid!",
        likes: "1.5k",
        timestamp: 1644459359000,
      },
      {
        id: "fc2e9a8c-7daa-4e14-980d-5467ca2054ec",
        name: "Mike Tyson",
        comment:
          "I reckon this dude got a mean left hook on him! watch out!!!! I enjoyed the part where he shows the highs and lows of training camp and what it takes to really dial in and get after it while also juggling work life. Camp gets lonely but I guess thats why they say it's lonely at the top",
        likes: "1M",
        timestamp: 1644459359000,
      },
    ],
  };
  videoData[0].push(newVideo);
  videoData[1].push(newVideo);
  console.log(newVideo);
  postVideoData(videoData);

  res.status(201).json(newVideo);
});

module.exports = router;
