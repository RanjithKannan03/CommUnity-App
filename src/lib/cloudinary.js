'use server';

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(image) {
    const imageData = await image.arrayBuffer();
    const mime = image.type;
    const encoding = 'base64';
    const base64Data = Buffer.from(imageData).toString('base64');
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;
    const result = await cloudinary.uploader.upload(fileUri, {
        folder: 'CommUnity',
    });
    return result.secure_url;
}

export async function uploadImages(formData) {
    const banner = formData.get('banner');
    const logo = formData.get('logo');

    const bannerData = await banner.arrayBuffer();
    const bannerMime = banner.type;
    const encoding = 'base64';
    const base64DataBanner = Buffer.from(bannerData).toString('base64');
    const bannerFileUri = 'data:' + bannerMime + ';' + encoding + ',' + base64DataBanner;
    const bannerResult = await cloudinary.uploader.upload(bannerFileUri, {
        folder: 'CommUnity',
    });

    const logoData = await logo.arrayBuffer();
    const logoMime = logo.type;
    const base64DataLogo = Buffer.from(logoData).toString('base64');
    const logoFileUri = 'data:' + logoMime + ';' + encoding + ',' + base64DataLogo;
    const logoResult = await cloudinary.uploader.upload(logoFileUri, {
        folder: 'CommUnity',
    });

    return {
        logoURL: logoResult.secure_url,
        bannerURL: bannerResult.secure_url
    }
}