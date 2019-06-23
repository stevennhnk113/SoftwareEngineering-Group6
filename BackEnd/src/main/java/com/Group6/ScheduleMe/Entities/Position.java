package com.Group6.ScheduleMe.Entities;

enum Position {
	Manager(1, "Manager"), Employee(2, "Employee");
	
	private String _PositionName;
	private int _PositionID;
	
	private Position(int id, String positionName)
	{
		this._PositionID = id;
		this._PositionName = positionName;
	}
	
	public String Name() {
		return this._PositionName;
	}
	
	public int ID()
	{
		return this._PositionID;
	}
}
