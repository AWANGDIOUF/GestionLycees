package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ExamenTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Examen.class);
        Examen examen1 = new Examen();
        examen1.setId(1L);
        Examen examen2 = new Examen();
        examen2.setId(examen1.getId());
        assertThat(examen1).isEqualTo(examen2);
        examen2.setId(2L);
        assertThat(examen1).isNotEqualTo(examen2);
        examen1.setId(null);
        assertThat(examen1).isNotEqualTo(examen2);
    }
}
