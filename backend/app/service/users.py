
#from sqlalchemy.future import select
#from app.model import Users, Person
#from app.config import db

class UserService:

    @staticmethod
    async def get_user_profile(username:str):
        query = select(Users.username, 
                        Users.email, 
                        Person.name, 
                        Person.birth,
                        Person.sex,
                        Person.profile,
                        Person.phone_number).join_from(Users,Person).where(Users.username == username)
        return(await db.execute(query)).mappings().one()

    @staticmethod
    def get_bus_code(bus_code:str):
        bus_code = open("//tsclient//D//fastapi-reactjs-loginpage-main//bus_code_process//data.txt","r").read()
        return bus_code


#print(UserService.get_bus_code(bus_code=""))