//creates a error subclass called DatabaseError
//this is used by all the services that use the prisma client

export default class DatabaseError extends Error{
	id : number;

	constructor(id: number, message: string) {
		super(message)
		this.id = id;
	}

	static Type(code: string){
		switch(code){
			case "P2000":
				return new DatabaseError(400, "Input is too long.");
			case "P2002":
				return new DatabaseError(400, "Duplicate entry");
			case "P2025":
				return new DatabaseError(400, "Could not find entry");
			case "P2003":
				return new DatabaseError(400, "Foreign key constraint failed");
			case "P0"	:
				return new DatabaseError(400, "Input is not valid")		
			default:
				return new DatabaseError(500, "Internal Server Error");
		}
	}
}