const cloudinary = require("cloudinary");

// the full url is this: https://res.cloudinary.com/db4yjzwhf/image/upload/v1709299714/videogameStore/kjnxdy684j1iajeagpzf.jpg
// for the public_id we only need the folder and the filename: videogameStore/kjnxdy684j1iajeagpzf.jpg

const deleteFile = (imgUrl) => {
  const urlSplit = imgUrl.split("/"); // split up the url by the / separators
  // const nameSplit = urlSplit[urlSplit.length - 1].split("."); // splitting off the last item of the array and then splitting off the jpg at the end
  const nameSplit = urlSplit.at(-1).split("."); // newer version (starts at the back)
  const folderSplit = urlSplit.at(-2);
  const public_id = `${folderSplit}/${nameSplit[0]}`; // nameSplit[0] - we only want the name and not the jpg extension

  cloudinary.v2.uploader.destroy(public_id, () => {
    console.log(`Image deleted at: ${public_id}`);
  });
};

module.exports = { deleteFile };
