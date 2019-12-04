# Free Images 
A website to browse for free images and download them, found at: [https://freeimg.netlify.com/](https://freeimg.netlify.com/)

## Built With
- React
- redux, react-redux, redux-thunk
- Bootstrap
- axios
- Pixabay API to fetch images, found at: [https://pixabay.com/api/docs/](https://pixabay.com/api/docs/)

## Cloning & Installation
If you want to run this project on your computer, first you'll need a **pixabay api key**. To do this, just go to the pixabay site at this address [https://pixabay.com/service/about/api/](https://pixabay.com/service/about/api/) and create an account and you'll get your free api key automaticly.
To clone this project and start it, open a terminal and follow this steps:
```
	git clone https://github.com/redasalmi/free-images.git
	cd free-images
```
At this step you need to create a file named "**.env**" at the root of your project, and put your api key inside of it as follows:
```
    REACT_APP_API_KEY=[your_api_key]
```
Just replace [your_api_key] with your own pixabay api key, then resume with the installation.
```
	npm install
	npm start
```
**Note:**
* ```npm install``` will install all the dependencies needed to run the project on your computer.
* ```npm start``` will open your default browser and start the website on your localhost.
