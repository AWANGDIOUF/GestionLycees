package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NiveauxCalificationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NiveauxCalification.class);
        NiveauxCalification niveauxCalification1 = new NiveauxCalification();
        niveauxCalification1.setId(1L);
        NiveauxCalification niveauxCalification2 = new NiveauxCalification();
        niveauxCalification2.setId(niveauxCalification1.getId());
        assertThat(niveauxCalification1).isEqualTo(niveauxCalification2);
        niveauxCalification2.setId(2L);
        assertThat(niveauxCalification1).isNotEqualTo(niveauxCalification2);
        niveauxCalification1.setId(null);
        assertThat(niveauxCalification1).isNotEqualTo(niveauxCalification2);
    }
}
