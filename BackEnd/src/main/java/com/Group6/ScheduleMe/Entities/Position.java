package com.Group6.ScheduleMe.Entities;

import java.util.ArrayList;
import java.util.List;

public class Position {
	private static List<String> _Positions = new ArrayList<String>();
	
	static {
		_Positions.add("Employee");
		_Positions.add("Manager");
	}
	
	public static List<String> GetPositions()
	{
		return _Positions;
	}
}
