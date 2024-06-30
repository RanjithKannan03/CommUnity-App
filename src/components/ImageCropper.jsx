'use client';

import React, { useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Image from "next/image";

export const ImageCropper = (props) => {
    const { imageToCrop, onImageCropped } = props;
    const [cropConfig, setCropConfig] = useState(
        {
            x: 25,
            y: 25,
            width: 50,
            height: 50
        }
    );

    const [imageRef, setImageRef] = useState();

    async function cropImage(crop) {
        if (imageRef && crop.width && crop.height) {
            const croppedImage = await getCroppedImage(
                imageRef,
                crop,
                'croppedImage.jpeg'
            );
            onImageCropped(croppedImage);
        }
    }

    function getCroppedImage(sourceImage, cropConfig, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = sourceImage.naturalWidth / sourceImage.width;
        const scaleY = sourceImage.naturalHeight / sourceImage.height;
        canvas.width = cropConfig.width;
        canvas.height = cropConfig.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            sourceImage,
            cropConfig.x * scaleX,
            cropConfig.y * scaleY,
            cropConfig.width * scaleX,
            cropConfig.height * scaleY,
            0,
            0,
            cropConfig.width,
            cropConfig.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(
                (blob) => {
                    // returning an error
                    if (!blob) {
                        reject(new Error('Canvas is empty'));
                        return;
                    }

                    blob.name = fileName;
                    // creating a Object URL representing the Blob object given
                    const croppedImageUrl = window.URL.createObjectURL(blob);

                    resolve(croppedImageUrl);
                }, 'image/jpeg'
            );
        });
    }
    return (

        <div className='lg:w-[60%] w-full dark:bg-[#1F1F1F] bg-[#E8F5FD] rounded-xl flex justify-center p-8' onClick={(e) => { e.stopPropagation() }}>
            <ReactCrop
                crop={cropConfig}
                ruleOfThirds
                onImageLoaded={(imageRef) => setImageRef(imageRef)}
                onComplete={(cropConfig) => cropImage(cropConfig)}
                onChange={(cropConfig) => setCropConfig(cropConfig)}
                crossorigin="anonymous"
            >
                <img src={imageToCrop} alt='crop-image' className="w-[200px]" />
            </ReactCrop>



        </div>
    )
}
