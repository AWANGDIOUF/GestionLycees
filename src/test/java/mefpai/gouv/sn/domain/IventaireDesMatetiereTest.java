package mefpai.gouv.sn.domain;

import static org.assertj.core.api.Assertions.assertThat;

import mefpai.gouv.sn.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IventaireDesMatetiereTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(IventaireDesMatetiere.class);
        IventaireDesMatetiere iventaireDesMatetiere1 = new IventaireDesMatetiere();
        iventaireDesMatetiere1.setId(1L);
        IventaireDesMatetiere iventaireDesMatetiere2 = new IventaireDesMatetiere();
        iventaireDesMatetiere2.setId(iventaireDesMatetiere1.getId());
        assertThat(iventaireDesMatetiere1).isEqualTo(iventaireDesMatetiere2);
        iventaireDesMatetiere2.setId(2L);
        assertThat(iventaireDesMatetiere1).isNotEqualTo(iventaireDesMatetiere2);
        iventaireDesMatetiere1.setId(null);
        assertThat(iventaireDesMatetiere1).isNotEqualTo(iventaireDesMatetiere2);
    }
}
