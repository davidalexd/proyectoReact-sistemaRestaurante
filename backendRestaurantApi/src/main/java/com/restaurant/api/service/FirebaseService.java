package com.restaurant.api.service;

import java.io.FileNotFoundException;
import java.io.IOException;

import com.google.cloud.storage.Blob;

public interface FirebaseService {

	Blob saveFile(byte[] file,String fileName,String pathFolder) throws FileNotFoundException, IOException;
	
	Blob getFile(String fileName) throws FileNotFoundException, IOException;
	
	void deleteFile(String fileName,String contentType);

	void checkIfExists(String fileName);

	String generateFileName(Long id, String type, String contentType);
}
