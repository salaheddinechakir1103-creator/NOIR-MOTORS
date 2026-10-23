import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const img1 = path.resolve('src/assets/images/video_shot_headlight_lens_1792769612084.jpg');
const img2 = path.resolve('src/assets/images/video_shot_rear_exhaust_1792769612941.jpg');
const img3 = path.resolve('src/assets/images/experience_atlas_drive_1792768237978.jpg');
const img4 = path.resolve('src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg');

const outDir = path.resolve('public/videos');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outMp4 = path.join(outDir, 'hero.mp4');
const clip1 = path.join(outDir, 'clip1.mp4');
const clip2 = path.join(outDir, 'clip2.mp4');
const clip3 = path.join(outDir, 'clip3.mp4');
const clip4 = path.join(outDir, 'clip4.mp4');

console.log('Rendering fast high-performance cinematic shots...');

// 4 shots, 4 seconds each, 24fps for cinematic cadence
// Shot 1: Headlight zoom-in
execSync(
  `ffmpeg -y -loop 1 -t 4 -i "${img1}" -vf "zoompan=z='min(zoom+0.002,1.25)':d=96:s=1920x1080:fps=24,format=yuv420p" -c:v libx264 -preset ultrafast -crf 20 "${clip1}"`,
  { stdio: 'inherit' }
);

// Shot 2: Rear diffuser pan
execSync(
  `ffmpeg -y -loop 1 -t 4 -i "${img2}" -vf "zoompan=z='1.15':x='(on/96)*(iw-iw/zoom)':d=96:s=1920x1080:fps=24,format=yuv420p" -c:v libx264 -preset ultrafast -crf 20 "${clip2}"`,
  { stdio: 'inherit' }
);

// Shot 3: High Atlas drive
execSync(
  `ffmpeg -y -loop 1 -t 4 -i "${img3}" -vf "zoompan=z='min(zoom+0.002,1.25)':d=96:s=1920x1080:fps=24,format=yuv420p" -c:v libx264 -preset ultrafast -crf 20 "${clip3}"`,
  { stdio: 'inherit' }
);

// Shot 4: Marrakech Villa pull-out
execSync(
  `ffmpeg -y -loop 1 -t 4 -i "${img4}" -vf "zoompan=z='max(1.2-0.002*on,1.0)':d=96:s=1920x1080:fps=24,format=yuv420p" -c:v libx264 -preset ultrafast -crf 20 "${clip4}"`,
  { stdio: 'inherit' }
);

// Merge with crossfades:
// clip 4s, xfade 0.6s
// offset 1: 3.4
// offset 2: 3.4 + 3.4 = 6.8
// offset 3: 6.8 + 3.4 = 10.2
console.log('Combining shots into final hero.mp4...');
execSync(
  `ffmpeg -y -i "${clip1}" -i "${clip2}" -i "${clip3}" -i "${clip4}" -filter_complex ` +
  `"[0:v][1:v]xfade=transition=fade:duration=0.6:offset=3.4[v1];` +
  `[v1][2:v]xfade=transition=fade:duration=0.6:offset=6.8[v2];` +
  `[v2][3:v]xfade=transition=fade:duration=0.6:offset=10.2[v]"` +
  ` -map "[v]" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -movflags +faststart "${outMp4}"`,
  { stdio: 'inherit' }
);

// Cleanup
[clip1, clip2, clip3, clip4].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

const stats = fs.statSync(outMp4);
console.log(`Video created successfully at ${outMp4} (${(stats.size / 1024 / 1024).toFixed(2)} MB)!`);
