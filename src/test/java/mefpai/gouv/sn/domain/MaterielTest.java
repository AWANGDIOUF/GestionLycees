package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class MaterielTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Materiel.class);
        Materiel materiel1 = new Materiel();
        materiel1.setId(1L);
        Materiel materiel2 = new Materiel();
        materiel2.setId(materiel1.getId());
        assertThat(materiel1).isEqualTo(materiel2);
        materiel2.setId(2L);
        assertThat(materiel1).isNotEqualTo(materiel2);
        materiel1.setId(null);
        assertThat(materiel1).isNotEqualTo(materiel2);
    }
}
