package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class OrganeGestionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrganeGestion.class);
        OrganeGestion organeGestion1 = new OrganeGestion();
        organeGestion1.setId(1L);
        OrganeGestion organeGestion2 = new OrganeGestion();
        organeGestion2.setId(organeGestion1.getId());
        assertThat(organeGestion1).isEqualTo(organeGestion2);
        organeGestion2.setId(2L);
        assertThat(organeGestion1).isNotEqualTo(organeGestion2);
        organeGestion1.setId(null);
        assertThat(organeGestion1).isNotEqualTo(organeGestion2);
    }
}
