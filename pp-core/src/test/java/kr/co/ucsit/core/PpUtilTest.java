package kr.co.ucsit.core;

import static org.junit.Assert.assertEquals;

import java.io.IOException;
import java.nio.file.Paths;

import org.junit.Test;

import dev.hyunlab.core.util.PpDateUtil;
import dev.hyunlab.core.util.PpUtil;

public class PpUtilTest {
	
	@Test
	public void testForceDelete() throws IOException {
		PpUtil.forceDelete(Paths.get("c:\\temp\\Driver"));
	}

}
