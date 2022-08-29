package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReformeMatiereTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ReformeMatiere.class);
        ReformeMatiere reformeMatiere1 = new ReformeMatiere();
        reformeMatiere1.setId(1L);
        ReformeMatiere reformeMatiere2 = new ReformeMatiere();
        reformeMatiere2.setId(reformeMatiere1.getId());
        assertThat(reformeMatiere1).isEqualTo(reformeMatiere2);
        reformeMatiere2.setId(2L);
        assertThat(reformeMatiere1).isNotEqualTo(reformeMatiere2);
        reformeMatiere1.setId(null);
        assertThat(reformeMatiere1).isNotEqualTo(reformeMatiere2);
    }
}
