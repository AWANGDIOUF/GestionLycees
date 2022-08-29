package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PersonnelAppuiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PersonnelAppui.class);
        PersonnelAppui personnelAppui1 = new PersonnelAppui();
        personnelAppui1.setId(1L);
        PersonnelAppui personnelAppui2 = new PersonnelAppui();
        personnelAppui2.setId(personnelAppui1.getId());
        assertThat(personnelAppui1).isEqualTo(personnelAppui2);
        personnelAppui2.setId(2L);
        assertThat(personnelAppui1).isNotEqualTo(personnelAppui2);
        personnelAppui1.setId(null);
        assertThat(personnelAppui1).isNotEqualTo(personnelAppui2);
    }
}
