import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const img1 = path.resolve('src/assets/images/video_shot_headlight_lens_1792769612084.jpg');
const img2 = path.resolve('src/assets/images/video_shot_rear_exhaust_1792769612941.jpg');
const img3 = path.resolve('src/assets/images/experience_atlas_drive_1792768237978.jpg');
const img4 = path.resolve('src/assets/images/hero_marrakech_palmeraie_1792768235408.jpg');

const outDir = path.resolve('public/videos');
const outMp4 = path.join(outDir, 'hero.mp4');

const c1 = path.join(outDir, 'c1.mp4');
const c2 = path.join(outDir, 'c2.mp4');
const c3 = path.join(outDir, 'c3.mp4');
const c4 = path.join(outDir, 'c4.mp4');

console.log('Rendering 4 video shots at 1080p...');

// 3.5s per shot at 24fps
execSync(`ffmpeg -y -loop 1 -t 3.5 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -c:v libx264 -preset ultrafast -r 24 "${c1}"`);
execSync(`ffmpeg -y -loop 1 -t 3.5 -i "${img2}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -c:v libx264 -preset ultrafast -r 24 "${c2}"`);
execSync(`ffmpeg -y -loop 1 -t 3.5 -i "${img3}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -c:v libx264 -preset ultrafast -r 24 "${c3}"`);
execSync(`ffmpeg -y -loop 1 -t 3.5 -i "${img4}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -c:v libx264 -preset ultrafast -r 24 "${c4}"`);

// Concatenate with crossfade transitions
console.log('Fusing into final cinematic hero.mp4...');
execSync(
  `ffmpeg -y -i "${c1}" -i "${c2}" -i "${c3}" -i "${c4}" -filter_complex ` +
  `"[0:v][1:v]xfade=transition=fade:duration=0.6:offset=2.9[v1];` +
  `[v1][2:v]xfade=transition=fade:duration=0.6:offset=5.8[v2];` +
  `[v2][3:v]xfade=transition=fade:duration=0.6:offset=8.7[v]"` +
  ` -map "[v]" -c:v libx264 -preset ultrafast -pix_fmt yuv420p -movflags +faststart "${outMp4}"`
);

// Cleanup intermediate clips
[c1, c2, c3, c4, path.join(outDir, 'clip1.mp4'), path.join(outDir, 'test.mp4')].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

const stats = fs.statSync(outMp4);
console.log(`HERO VIDEO GENERATED: ${outMp4} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
