/**
 * 
 */
package kr.co.ucsit.core;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import dev.hyunlab.core.misc.PpCrypto;

/**
 * @author hyunseongkil
 *
 */
public class CsCryptoTest {

	@Test
	public void testSha256() {
		String cipherText = PpCrypto.sha256("abcd1234");
		String expect = "e9cee71ab932fde863338d08be4de9dfe39ea049bdafb342ce659ec5450b69ae";
		//
		assertEquals(expect, cipherText);
	}
	
	@Test
	public void testSha512() {
		String cipherText = PpCrypto.sha512("abcd1234");
//		System.out.println(cipherText);
		String expect = "925f43c3cfb956bbe3c6aa8023ba7ad5cfa21d104186fffc69e768e55940d9653b1cd36fba614fba2e1844f4436da20f83750c6ec1db356da154691bdd71a9b1";
		
		//
		assertEquals(expect, cipherText);
	}
	
	@Test
	public void testEncrypt() {
		String plainText = "abcd1234";
		String cipherText = PpCrypto.encrypt(plainText);
//		System.out.println(cipherText);
		
		String expect = "TQyFexNvk4su1QsxTLzw6Q==";
		
		//
		assertEquals(expect, cipherText);
	}
	
	@Test
	public void testDecrypt() {
		String cipherText = "TQyFexNvk4su1QsxTLzw6Q==";
		String plainText = PpCrypto.decrypt(cipherText);
		String expect = "abcd1234";
		
		//
		assertEquals(expect, plainText);
	}
}
