package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DifficulteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Difficulte.class);
        Difficulte difficulte1 = new Difficulte();
        difficulte1.setId(1L);
        Difficulte difficulte2 = new Difficulte();
        difficulte2.setId(difficulte1.getId());
        assertThat(difficulte1).isEqualTo(difficulte2);
        difficulte2.setId(2L);
        assertThat(difficulte1).isNotEqualTo(difficulte2);
        difficulte1.setId(null);
        assertThat(difficulte1).isNotEqualTo(difficulte2);
    }
}
