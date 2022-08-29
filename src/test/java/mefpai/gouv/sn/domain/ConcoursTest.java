package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConcoursTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Concours.class);
        Concours concours1 = new Concours();
        concours1.setId(1L);
        Concours concours2 = new Concours();
        concours2.setId(concours1.getId());
        assertThat(concours1).isEqualTo(concours2);
        concours2.setId(2L);
        assertThat(concours1).isNotEqualTo(concours2);
        concours1.setId(null);
        assertThat(concours1).isNotEqualTo(concours2);
    }
}
