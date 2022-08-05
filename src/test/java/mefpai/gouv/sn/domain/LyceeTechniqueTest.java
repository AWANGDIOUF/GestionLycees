package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LyceeTechniqueTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LyceeTechnique.class);
        LyceeTechnique lyceeTechnique1 = new LyceeTechnique();
        lyceeTechnique1.setId(1L);
        LyceeTechnique lyceeTechnique2 = new LyceeTechnique();
        lyceeTechnique2.setId(lyceeTechnique1.getId());
        assertThat(lyceeTechnique1).isEqualTo(lyceeTechnique2);
        lyceeTechnique2.setId(2L);
        assertThat(lyceeTechnique1).isNotEqualTo(lyceeTechnique2);
        lyceeTechnique1.setId(null);
        assertThat(lyceeTechnique1).isNotEqualTo(lyceeTechnique2);
    }
}
