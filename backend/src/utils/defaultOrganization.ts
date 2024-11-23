import { OrganizationRepository } from "../data/repositories/organizationRepository";

export const createDefaultOrganization = async (): Promise<void> => {
    const defaultOrgCode = "ORG-001";

    try {
        // Verificar si la organización principal ya existe
        const existingOrg = await OrganizationRepository.findOne({
            where: { orgcod: defaultOrgCode },
        });

        if (!existingOrg) {
            // Crear la organización principal con datos completos
            const defaultOrg = OrganizationRepository.create({
                orgcod: defaultOrgCode,
                orgver: 0.01, // Versión
                orgfeccrea: new Date(), // Fecha de creación actual
                orgfecmod: Date.now(), // Fecha de modificación actual
                orgnom: "Empresa de Software ReqWizards", // Nombre
                orgdir: "Calle Ficticia 123, Ciudad Arequipa", // Dirección
                orgtel: "123456789", // Teléfono
                orgrepleg: "Juan Pérez", // Representante legal
                orgtelrepleg: 987654321, // Teléfono del representante legal
                orgruc: 20481234567, // RUC
                orgcontact: "contacto@reqwizards.com", // Contacto
                orgtelcon: "999888777", // Teléfono del contacto
                orgtiporgcod: "TIP-001", // Código del tipo de organización
                orgautcod: "AUT-001", // Código de autorización
                orgest: "principal", // Estado
                orgcom: "Organización principal creada automáticamente", // Comentarios
                orgartcod: "ART-001", // Código del artefacto relacionado
                orgusuid: 1, // ID del usuario creador
            });

            // Guardar en la base de datos
            await OrganizationRepository.save(defaultOrg);
            console.log("Default organization created:", defaultOrgCode);
        } else {
            console.log("Default organization already exists:", defaultOrgCode);
        }
    } catch (error) {
        console.error("Error creating default organization:", error);
    }
};

