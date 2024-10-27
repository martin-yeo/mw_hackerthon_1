package kr.ac.mokwon.javaspring.web.util.file;

import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

public class FileWriter {
	private FileOutputStream fos;
	
	public int writeFile(MultipartFile file, String path, String fileName) {
		try {
			byte fileData[] = file.getBytes();
			fos = new FileOutputStream(path + fileName);
			fos.write(fileData);
			fos.getFD().sync();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			if(fos != null) {
				try { 
					fos.close();
					fileName = path + fileName;
					return 1;
				} catch(Exception e){}
			}
		}
		return 0;
	}
	
	public int writeThumbNailFile(File file, String path, String fileName) {
		try {
			byte fileData[] = read(file);
			fos = new FileOutputStream(path + fileName);
			fos.write(fileData);
			fos.getFD().sync();
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			if(fos != null) {
				try { 
					fos.close();
					fileName = path + fileName;
					return 1;
				} catch(Exception e){}
			}
		}
		return 0;
	}
	
	public byte[] read(File file) throws IOException {
	    ByteArrayOutputStream ous = null;
	    InputStream ios = null;
	    try {
	        byte[] buffer = new byte[4096];
	        ous = new ByteArrayOutputStream();
	        ios = new FileInputStream(file);
	        int read = 0;
	        	while((read = ios.read(buffer)) != -1) {
	        		ous.write(buffer, 0, read);
	        	}
	    } finally { 
	        try {
	             if (ous != null) ous.close();
	        } catch (IOException e) {}

	        try {
	             if (ios != null) ios.close();
	        } catch (IOException e) {}
	    }
	    return ous.toByteArray();
	}
	
	public void copy(File source, File target) {
		FileInputStream in = null;
		FileOutputStream out = null;
		try {
			in = new FileInputStream(source);
			out = new FileOutputStream(target);
			IOUtils.copy(in, out);
		} catch(IOException ex) {
			ex.printStackTrace();
		} finally {
			IOUtils.closeQuietly(in);
			IOUtils.closeQuietly(out);
		}
	}
	
	public void deleteFile(String directory, String fileName) throws IOException {
		File file = new File(directory+fileName);
		file.deleteOnExit();
	}
}