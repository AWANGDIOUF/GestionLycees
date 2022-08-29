package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DirecteurEtudeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DirecteurEtude.class);
        DirecteurEtude directeurEtude1 = new DirecteurEtude();
        directeurEtude1.setId(1L);
        DirecteurEtude directeurEtude2 = new DirecteurEtude();
        directeurEtude2.setId(directeurEtude1.getId());
        assertThat(directeurEtude1).isEqualTo(directeurEtude2);
        directeurEtude2.setId(2L);
        assertThat(directeurEtude1).isNotEqualTo(directeurEtude2);
        directeurEtude1.setId(null);
        assertThat(directeurEtude1).isNotEqualTo(directeurEtude2);
    }
}
