package kr.co.ucsit.core;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import dev.hyunlab.core.util.PpDateUtil;

public class CsDateUtilTest {
	
	@Test
	public void testGetYyyy() {
		assertEquals(PpDateUtil.getYyyy(), "2020");
	}

}
