## Usage

### Server

- Build and run container from source:

```
docker build -t nginx-rtmp .
docker run -it -p 1935:1935 -p 8080:80 --rm nginx-rtmp
```

- Stream live content to:

```
rtmp://<server ip>:1935/stream/$USERNAME
```

### SSL

To enable SSL, see [nginx.conf](nginx.conf) and uncomment the lines:

```
listen 443 ssl;
ssl_certificate     /opt/certs/example.com.crt;
ssl_certificate_key /opt/certs/example.com.key;
```

This will enable HTTPS using a self-signed certificate supplied in [/certs](/certs). If you wish to use HTTPS, it is **highly recommended** to obtain your own certificates and update the `ssl_certificate` and `ssl_certificate_key` paths.

I recommend using [Certbot](https://certbot.eff.org/docs/install.html) from [Let's Encrypt](https://letsencrypt.org).

### OBS Configuration

- Stream Type: `Custom Streaming Server`
- URL: `rtmp://localhost:1935/stream`
- Stream Key: `hello`

### Watch Stream

- In Safari, VLC or any HLS player, open:

```
http://<server ip>:8080/live/hls/$USERNAME.m3u8
```

- Example HLS Playlist: `http://localhost:8080/live/hls/$USERNAME.m3u8`
- Example DASH Playlist: `http://localhost:8080/live/dash/$USERNAME_dash/index.mpd`

### FFmpeg Build

```
ffmpeg version 4.1.3 Copyright (c) 2000-2019 the FFmpeg developers
  built with gcc 6.4.0 (Alpine 6.4.0)
  configuration: --prefix=/usr/local --enable-version3 --enable-gpl --enable-nonfree --enable-small --enable-libmp3lame --enable-libx264 --enable-libx265 --enable-libvpx --enable-libtheora --enable-libvorbis --enable-libopus --enable-libfdk-aac --enable-libass --enable-libwebp --enable-librtmp --enable-postproc --enable-avresample --enable-libfreetype --enable-openssl --disable-debug --disable-doc --disable-ffplay --extra-libs='-lpthread -lm'
  libavutil      56. 22.100 / 56. 22.100
  libavcodec     58. 35.100 / 58. 35.100
  libavformat    58. 20.100 / 58. 20.100
  libavdevice    58.  5.100 / 58.  5.100
  libavfilter     7. 40.101 /  7. 40.101
  libavresample   4.  0.  0 /  4.  0.  0
  libswscale      5.  3.100 /  5.  3.100
  libswresample   3.  3.100 /  3.  3.100
  libpostproc    55.  3.100 / 55.  3.100

  configuration:
    --prefix=/usr/local
    --enable-version3
    --enable-gpl
    --enable-nonfree
    --enable-small
    --enable-libmp3lame
    --enable-libx264
    --enable-libx265
    --enable-libvpx
    --enable-libtheora
    --enable-libvorbis
    --enable-libopus
    --enable-libfdk-aac
    --enable-libass
    --enable-libwebp
    --enable-librtmp
    --enable-postproc
    --enable-avresample
    --enable-libfreetype
    --enable-openssl
    --disable-debug
    --disable-doc
    --disable-ffplay
    --extra-libs='-lpthread -lm'
```

## Resources

- https://alpinelinux.org/
- http://nginx.org
- https://github.com/arut/nginx-rtmp-module
- https://www.ffmpeg.org
- https://obsproject.com
