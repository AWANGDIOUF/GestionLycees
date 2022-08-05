package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NiveauxEtudesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NiveauxEtudes.class);
        NiveauxEtudes niveauxEtudes1 = new NiveauxEtudes();
        niveauxEtudes1.setId(1L);
        NiveauxEtudes niveauxEtudes2 = new NiveauxEtudes();
        niveauxEtudes2.setId(niveauxEtudes1.getId());
        assertThat(niveauxEtudes1).isEqualTo(niveauxEtudes2);
        niveauxEtudes2.setId(2L);
        assertThat(niveauxEtudes1).isNotEqualTo(niveauxEtudes2);
        niveauxEtudes1.setId(null);
        assertThat(niveauxEtudes1).isNotEqualTo(niveauxEtudes2);
    }
}
