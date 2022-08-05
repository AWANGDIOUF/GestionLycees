package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ComptableFinancierTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ComptableFinancier.class);
        ComptableFinancier comptableFinancier1 = new ComptableFinancier();
        comptableFinancier1.setId(1L);
        ComptableFinancier comptableFinancier2 = new ComptableFinancier();
        comptableFinancier2.setId(comptableFinancier1.getId());
        assertThat(comptableFinancier1).isEqualTo(comptableFinancier2);
        comptableFinancier2.setId(2L);
        assertThat(comptableFinancier1).isNotEqualTo(comptableFinancier2);
        comptableFinancier1.setId(null);
        assertThat(comptableFinancier1).isNotEqualTo(comptableFinancier2);
    }
}
