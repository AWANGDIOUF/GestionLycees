package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ComptableMatiereTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComptableMatiere.class);
        ComptableMatiere comptableMatiere1 = new ComptableMatiere();
        comptableMatiere1.setId(1L);
        ComptableMatiere comptableMatiere2 = new ComptableMatiere();
        comptableMatiere2.setId(comptableMatiere1.getId());
        assertThat(comptableMatiere1).isEqualTo(comptableMatiere2);
        comptableMatiere2.setId(2L);
        assertThat(comptableMatiere1).isNotEqualTo(comptableMatiere2);
        comptableMatiere1.setId(null);
        assertThat(comptableMatiere1).isNotEqualTo(comptableMatiere2);
    }
}
