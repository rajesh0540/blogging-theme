import sharp from "sharp";

type OptimizeImageArgs = {
  src: string;
};

type OptimizeImageReturn = {
  placeholder: string;
};

const cache: Record<string, string> = {};

export type OptimizeImage = (
  args: OptimizeImageArgs
) => Promise<OptimizeImageReturn>;

const optimizeImage: OptimizeImage = async ({ src }) => {
  let output = "";

  if (cache[src]) {
    return { placeholder: cache[src] };
  }

  try {
    let imageBuffer: Buffer | null = null;

    const fetchImageResponse = await fetch(src);
    imageBuffer = Buffer.from(await fetchImageResponse.arrayBuffer());

    if (imageBuffer) {
      const webpBuffer = await sharp(imageBuffer)
        .resize(400)
        .webp({
          quality: 10,
        })
        .blur(20)
        .toBuffer();
      output = `data:image/webp;base64,${webpBuffer.toString("base64")}`;

      cache[src] = output;
    }
  } catch (e) {}

  return {
    placeholder: output,
  };
};

export default optimizeImage;
