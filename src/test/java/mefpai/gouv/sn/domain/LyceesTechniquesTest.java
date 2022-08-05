package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LyceesTechniquesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LyceesTechniques.class);
        LyceesTechniques lyceesTechniques1 = new LyceesTechniques();
        lyceesTechniques1.setId(1L);
        LyceesTechniques lyceesTechniques2 = new LyceesTechniques();
        lyceesTechniques2.setId(lyceesTechniques1.getId());
        assertThat(lyceesTechniques1).isEqualTo(lyceesTechniques2);
        lyceesTechniques2.setId(2L);
        assertThat(lyceesTechniques1).isNotEqualTo(lyceesTechniques2);
        lyceesTechniques1.setId(null);
        assertThat(lyceesTechniques1).isNotEqualTo(lyceesTechniques2);
    }
}
