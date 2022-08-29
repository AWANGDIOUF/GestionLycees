package mefpai.gouv.sn;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("mefpai.gouv.sn");

        noClasses()
            .that()
            .resideInAnyPackage("mefpai.gouv.sn.service..")
            .or()
            .resideInAnyPackage("mefpai.gouv.sn.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..mefpai.gouv.sn.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
