package com.restaurant.api.utils;

import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

import javax.imageio.ImageIO;

public class ImageTools {

	public static byte[] resize(byte[] image,int width, int height) throws IOException{
		ByteArrayInputStream bais = new ByteArrayInputStream(image);
		BufferedImage bufferedImage = null;
		try {
			bufferedImage = ImageIO.read(bais);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		BufferedImage outputImage = new BufferedImage(width, height, bufferedImage.getType());
		Graphics2D g2d = outputImage.createGraphics();
		g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BICUBIC);
	    g2d.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);	    
		g2d.drawImage(bufferedImage,0,0,width,height,null);
		g2d.dispose();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(outputImage, "jpg", baos);
		image = baos.toByteArray();
		return image;
	}
	
}
