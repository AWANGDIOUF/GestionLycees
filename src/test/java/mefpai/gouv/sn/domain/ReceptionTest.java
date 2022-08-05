package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReceptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reception.class);
        Reception reception1 = new Reception();
        reception1.setId(1L);
        Reception reception2 = new Reception();
        reception2.setId(reception1.getId());
        assertThat(reception1).isEqualTo(reception2);
        reception2.setId(2L);
        assertThat(reception1).isNotEqualTo(reception2);
        reception1.setId(null);
        assertThat(reception1).isNotEqualTo(reception2);
    }
}
