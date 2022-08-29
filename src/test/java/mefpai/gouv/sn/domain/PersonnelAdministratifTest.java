package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PersonnelAdministratifTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonnelAdministratif.class);
        PersonnelAdministratif personnelAdministratif1 = new PersonnelAdministratif();
        personnelAdministratif1.setId(1L);
        PersonnelAdministratif personnelAdministratif2 = new PersonnelAdministratif();
        personnelAdministratif2.setId(personnelAdministratif1.getId());
        assertThat(personnelAdministratif1).isEqualTo(personnelAdministratif2);
        personnelAdministratif2.setId(2L);
        assertThat(personnelAdministratif1).isNotEqualTo(personnelAdministratif2);
        personnelAdministratif1.setId(null);
        assertThat(personnelAdministratif1).isNotEqualTo(personnelAdministratif2);
    }
}
