package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProgrammeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Programme.class);
        Programme programme1 = new Programme();
        programme1.setId(1L);
        Programme programme2 = new Programme();
        programme2.setId(programme1.getId());
        assertThat(programme1).isEqualTo(programme2);
        programme2.setId(2L);
        assertThat(programme1).isNotEqualTo(programme2);
        programme1.setId(null);
        assertThat(programme1).isNotEqualTo(programme2);
    }
}
