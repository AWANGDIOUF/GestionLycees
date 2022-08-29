package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MouvementMatiereTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MouvementMatiere.class);
        MouvementMatiere mouvementMatiere1 = new MouvementMatiere();
        mouvementMatiere1.setId(1L);
        MouvementMatiere mouvementMatiere2 = new MouvementMatiere();
        mouvementMatiere2.setId(mouvementMatiere1.getId());
        assertThat(mouvementMatiere1).isEqualTo(mouvementMatiere2);
        mouvementMatiere2.setId(2L);
        assertThat(mouvementMatiere1).isNotEqualTo(mouvementMatiere2);
        mouvementMatiere1.setId(null);
        assertThat(mouvementMatiere1).isNotEqualTo(mouvementMatiere2);
    }
}
