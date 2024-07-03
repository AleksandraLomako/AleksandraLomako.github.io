const video_list = {
    0: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    1: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    2: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
    3: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
}

function createPlayer(link, player_src) {
    let mainTag = document.querySelector('.container');
    for (const [key, value] of Object.entries(link)) {
        console.log(value);
        let videoItemTag = document.createElement('video');
        videoItemTag.id = key;
        videoItemTag.className = 'video-js vjs-default-skin';
        videoItemTag.style.width = window.screen.width / 2 - 20 + 'px';
        videoItemTag.style.height = window.screen.height / 2 - 70 + 'px';
        videoItemTag.setAttribute('data-setup', '{ "fluid": false,  "inactivityTimeout": 0}');
        // videoItemTag.setAttribute("controls", "controls");
        videoItemTag.setAttribute("autoplay", "any");
        videoItemTag.setAttribute("muted", "muted");
        let sourceVideo = document.createElement('source');
        videoItemTag.appendChild(sourceVideo);
        sourceVideo.type = "application/x-mpegURL";
        sourceVideo.src = value;
        let sp = document.createElement('script');
        sp.setAttribute('type', 'text/javascript');
        sp.src = player_src;
        videoItemTag.appendChild(sp);
        mainTag.append(videoItemTag);
    }
}

createPlayer(video_list, "js/player.js");
