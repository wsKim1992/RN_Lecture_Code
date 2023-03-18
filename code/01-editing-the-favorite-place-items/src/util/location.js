const GOOGLE_API_KEY = "AIzaSyDFf3oe0K0vdNxARCSrVV-qRdOT05hLOwE";

function getMapPreview(lat, lng) {
	const imagePreviewURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}&signature=YOUR_SIGNATURE`;
	return imagePreviewURL;
}

export default getMapPreview;
