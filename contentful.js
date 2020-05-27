const spaceId = 'kk73hibkopnf';
const environmentId = 'master';
const accessToken = 'VzzO5S7EV__A3bnZVnasBdLM4g4v-PtNF3NlxnT0AAs';

const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=-fields.price&content_type=menuItem`;

const sectionTag = document.querySelector('section.grid');

const grabData = function() {
  return fetch(url)
  .then(response => response.json())
  .then(data => {
    // store assets
    const assets = data.includes.Asset
    // turn our Contentful data into something useful
    return data.items.map(item => {
      let imageUrl = 'image1.jpg';
      const imageId = item.fields.image.sys.id
			// in each asset, if the image id is the same, set the imageData
      const imageData = assets.find(asset => {
        return asset.sys.id == imageId 
      })
      
      if (imageData) {
        imageUrl = imageData.fields.file.url
      }
      if (imageUrl.startsWith('//')) {
        imageUrl = imageUrl.split('//').join('https://')
      }
      item.fields.image = imageUrl;
      return item.fields
    })
  })
}

grabData().then(data => {
  // do something with the returned data
  console.log(data);
  sectionTag.innerHTML = '';
  data.forEach(item => {
    sectionTag.innerHTML = sectionTag.innerHTML + `
		<div class="item">
			<img src="${item.image}">
			<div class="title">
				<h2>${item.menuTitle}</h2>
				<p>${item.price}</p>
			</div>
			<p>${item.description}</p>
		</div>
	`;
  })
})