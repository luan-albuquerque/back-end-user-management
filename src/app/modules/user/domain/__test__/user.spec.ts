import { AccessLevel, UserEntity, UserProps } from "../user.entity"

describe("User Test", () => {

    it("should be constructor() with user admin", () => {

        let userProps: UserProps = {
            name: 'admin_name',
            surname: 'admin_surname',
            access_level: AccessLevel.ADMIN,
            email: "useradmin@mail.com",
            password: 'admin_password'
        };
        let user = UserEntity.create(userProps);
        expect(user.props).toEqual({
            ...userProps
        })

        userProps = {
            name: 'admin_name',
            surname: "admin_surname",
            access_level: AccessLevel.ADMIN,
            email: "useradmin2@mail.com",
            password: "admin_password",
        }

        expect(user.id).toBeDefined();
        user = UserEntity.create(userProps);
        expect(user.props).toEqual({
            ...userProps
        })

    })


    it("should be constructor() with user standard", () => {

        let userProps: UserProps = {
            name: 'standard_name',
            surname: 'standard_surname',
            access_level: AccessLevel.STANDARD,
            email: "userstandard@mail.com",
            password: 'standard_password'
        };
        let user = UserEntity.create(userProps);
        expect(user.props).toEqual({
            ...userProps
        })

        userProps = {
            name: 'standard_name',
            surname: "standard_surname",
            access_level: AccessLevel.STANDARD,
            email: "userstandard@mail.com",
            password: "admin_password",
        }

        expect(user.id).toBeDefined();
        user = UserEntity.create(userProps);
        expect(user.props).toEqual({
            ...userProps
        })

    })

    it('should be updateName method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD
        };
        const user = UserEntity.create(userProps);
        user.updateName('new_name');
        expect(user.name).toBe('new_name');
    });

    it('should be updateSurname method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD
        };
        let user = UserEntity.create(userProps);
        user.updateSurname('new_surname');
        expect(user.surname).toBe('new_surname');
    });

    it('should be updateEmail method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD
        };
        let user = UserEntity.create(userProps);
        user.updateEmail('new_email_updated@mail.com');
        expect(user.email).toBe('new_email_updated@mail.com');
    });

    it('should be updatePassword method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD
        };
        let user = UserEntity.create(userProps);
        user.updatePassword('new_password_updated');
        expect(user.password).toBe('new_password_updated');
    });



})