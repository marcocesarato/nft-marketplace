db = db.getSiblingDB("metadata");
db.createCollection("sample");
db.sample.insertMany([
	{
		title: "Sample data",
	},
]);
