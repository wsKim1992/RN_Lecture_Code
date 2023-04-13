import { action, makeObservable, observable } from "mobx";

class UploadPictureClass {
	uploadMode = false;
	//0 = cameramode 1= gallerymode
	showPictureMode = 0;
	// 00 = 이미지 show X 이미지 animation X
	// 11 = 이미지 show O 이미지 animation O
	// 10 = 이미지 show O 이미지 animation X
	showEndModal = false;
	// 이미지 업로드 페이지 나가는지 여부
	constructor() {
		makeObservable(this, {
			uploadMode: observable,
			showPictureMode: observable,
			showEndModal: observable,
			changeShowPictureMode: action.bound,
			setShowEndModal: action.bound,
			initEntireState: action.bound,
		});
	}

	initEntireState() {
		this.showEndModal = false;
		this.showPictureMode = 0;
		this.uploadMode = false;
	}

	setShowEndModal() {
		this.showEndModal = !this.showEndModal;
	}

	changeShowPictureMode(mode, isShowImage) {
		mode.forEach((v) => {
			const { step, value } = v;
			isShowImage === false
				? (this.showPictureMode =
						this.showPictureMode ^ (value << step))
				: (this.showPictureMode =
						this.showPictureMode | (value << step));
		});
	}

	changeUploadMode(flag) {
		this.uploadMode = flag;
	}
}

const UploadPictureStore = new UploadPictureClass();

export default UploadPictureStore;
