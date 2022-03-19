package com.restaurant.api.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@Service
public class FirebaseServiceImpl implements FirebaseService{

	private Storage storage;
	private String bucket = "restaurant-storage.appspot.com";
	private Credentials credentials;
	public FirebaseServiceImpl() throws FileNotFoundException, IOException {
		credentials = GoogleCredentials.fromStream(new FileInputStream("assets/credentials.json"));
		storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
	}
	
	@Override
	public Blob saveFile(byte[] file, String fileName, String contentType) throws FileNotFoundException, IOException{
		// TODO Auto-generated method stub
		BlobId blobId = BlobId.of(bucket, fileName);
		BlobInfo blobInfo= BlobInfo.newBuilder(blobId).setContentType(contentType).build();
		Blob blob = storage.create(blobInfo,file);
		return blob;
	}

	@Override
	public Blob getFile(String fileName) throws FileNotFoundException, IOException {
		// TODO Auto-generated method stub
		BlobId blobId = BlobId.of(bucket, fileName);
		Blob blob = storage.get(blobId);
		return blob;
	}


	@Override
	public void deleteFile(String fileName, String contentType) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void checkIfExists(String fileName) {
		if(fileName != null) {
			Blob blob;
			try {
				blob = this.getFile(fileName);
				if(blob != null) {
					if(blob.exists()) {
						blob.delete();
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public String generateFileName(Long id, String type, String contentType) {
		Date date = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy-HH-mm-ss");
		String dateName = dateFormat.format(date);
		String fileName = String.format("%d-%s-%s.%s", id,type,dateName,contentType);
		return fileName;
	}
}
