import { AccessLevel } from "../../data/enums/acess-level.enum";
import { UserEntity, UserProps } from "../user.entity"

describe("User Test", () => {

    it("should be constructor() with user admin", () => {

        let userProps: UserProps = {
            name: 'admin_name',
            surname: 'admin_surname',
            access_level: AccessLevel.ADMIN,
            email: "useradmin@mail.com",
            password: 'admin_password',
            createdAt: new Date(),
        };
        let user = UserEntity.create(userProps);
        expect(user.props.access_level).toEqual(userProps.access_level);
        expect(user.props.password).toEqual(userProps.password);
        expect(user.props.email).toEqual(userProps.email);
        expect(user.props.surname).toEqual(userProps.surname);
        expect(user.props.name).toEqual(userProps.name);

        userProps = {
            name: 'admin_name',
            surname: "admin_surname",
            access_level: AccessLevel.ADMIN,
            email: "useradmin2@mail.com",
            password: "admin_password",
            createdAt: new Date(),
        }

        expect(user.id).toBeDefined();
        user = UserEntity.create(userProps);
        expect(user.props.access_level).toEqual(userProps.access_level);
        expect(user.props.password).toEqual(userProps.password);
        expect(user.props.email).toEqual(userProps.email);
        expect(user.props.surname).toEqual(userProps.surname);
        expect(user.props.name).toEqual(userProps.name);

    })


    it("should be constructor() with user standard", () => {

        let userProps: UserProps = {
            name: 'standard_name',
            surname: 'standard_surname',
            access_level: AccessLevel.STANDARD,
            email: "userstandard@mail.com",
            password: 'standard_password',
            createdAt: new Date(),
        };
        let user = UserEntity.create(userProps);
        expect(user.props.access_level).toEqual(userProps.access_level);
        expect(user.props.password).toEqual(userProps.password);
        expect(user.props.email).toEqual(userProps.email);
        expect(user.props.surname).toEqual(userProps.surname);
        expect(user.props.name).toEqual(userProps.name);

        userProps = {
            name: 'standard_name',
            surname: "standard_surname",
            access_level: AccessLevel.STANDARD,
            email: "userstandard@mail.com",
            password: "admin_password",
            createdAt: new Date(),
        }

        expect(user.id).toBeDefined();
        user = UserEntity.create(userProps);
        expect(user.props.access_level).toEqual(userProps.access_level);
        expect(user.props.password).toEqual(userProps.password);
        expect(user.props.email).toEqual(userProps.email);
        expect(user.props.surname).toEqual(userProps.surname);
        expect(user.props.name).toEqual(userProps.name);

    })

    it('should be updateName method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD,
            createdAt: new Date(),
        };
        const user = UserEntity.create(userProps);
        user.updateName('new_name');
        expect(user.name).toBe('new_name');
        expect(user.updatedAt).toBeInstanceOf(Date)
    });

    it('should be updateSurname method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD,
            createdAt: new Date(),
        };
        let user = UserEntity.create(userProps);
        user.updateSurname('new_surname');
        expect(user.surname).toBe('new_surname');
        expect(user.updatedAt).toBeInstanceOf(Date)
    });

    it('should be updateEmail method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD,
            createdAt: new Date(),
        };
        let user = UserEntity.create(userProps);
        user.updateEmail('new_email_updated@mail.com');
        expect(user.email).toBe('new_email_updated@mail.com');
        expect(user.updatedAt).toBeInstanceOf(Date)
    });

    it('should be updatePassword method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD,
            createdAt: new Date(),
        };
        let user = UserEntity.create(userProps);
        user.updatePassword('new_password_updated');
        expect(user.password).toBe('new_password_updated');
        expect(user.updatedAt).toBeInstanceOf(Date)
    });

    it('should be updateIsEnabled method', () => {
        let userProps: UserProps = {
            name: 'name',
            surname: 'surname',
            email: 'email@mail.com',
            password: 'password',
            access_level: AccessLevel.STANDARD,
            createdAt: new Date(),
        };
        let user = UserEntity.create(userProps);
        user.updateIsEnabled(false);
        expect(user.is_enabled).toBe(false);
        expect(user.updatedAt).toBeInstanceOf(Date)
    });



})